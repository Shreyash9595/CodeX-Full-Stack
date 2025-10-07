const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 4000;

// --- DATABASE CONNECTION ---
const dbURI = 'mongodb://localhost:27017/codex';
mongoose.connect(dbURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('DB Connection Error: ', err));

// --- DATABASE BLUEPRINT (SCHEMA) ---
const snippetSchema = new mongoose.Schema({
    title: String,
    language: String,
    codeBlock: String,
    tags: [String],
    isPublic: Boolean,
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  snippets: [snippetSchema]
});
const User = mongoose.model('User', userSchema);

const teamLeads = [{ email: "lead@me.com", password: "123" }];


// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- API ROUTES ---
app.get('/', (req, res) => {
  res.send('Hello from the CodeX Backend!');
});

app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
  try {
    const newUser = await User.create({ name: email.split('@')[0], email, password });
    console.log('New user saved to database:', newUser);
    return res.status(201).json({ message: 'User created successfully!', user: newUser });
  } catch (error) {
    return res.status(400).json({ message: 'Error creating user. Email may already be in use.' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
  try {
    const teamLead = teamLeads.find(lead => lead.email === email && lead.password === password);
    if (teamLead) {
        return res.status(200).json({ message: 'Login successful!', user: { email: teamLead.email, name: 'Team Lead', role: 'teamLead' } });
    }
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    return res.status(200).json({ message: 'Login successful!', user: { ...user.toObject(), role: 'developer' } });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

app.post('/api/snippets', async (req, res) => {
  const { userId, title, language, codeBlock, tags, isPublic } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const newSnippet = { title, language, codeBlock, tags, isPublic };
    user.snippets.push(newSnippet);
    await user.save();
    res.status(201).json(newSnippet);
  } catch (error) {
    res.status(500).json({ message: 'Error adding snippet' });
  }
});

app.put('/api/snippets/:id', async (req, res) => {
  const { id } = req.params;
  const updatedSnippetData = req.body;
  try {
    const user = await User.findOne({ "snippets._id": id });
    if (!user) {
      return res.status(404).json({ message: 'Snippet not found' });
    }
    const snippet = user.snippets.id(id);
    snippet.set(updatedSnippetData);
    await user.save();
    res.status(200).json({ message: 'Snippet updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating snippet' });
  }
});

app.delete('/api/snippets/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ "snippets._id": id });
    if (!user) {
      return res.status(404).json({ message: 'Snippet not found' });
    }
    user.snippets.id(id).remove();
    await user.save();
    res.status(200).json({ message: 'Snippet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting snippet' });
  }
});

// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});