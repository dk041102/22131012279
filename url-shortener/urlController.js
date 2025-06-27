const generateShortCode = require('../utils/generateCode');
const { saveUrl, getUrl, isExpired } = require('../store/urlStore');

const DEFAULT_EXPIRY_MINUTES = 30;

exports.createShortUrl = (req, res) => {
  try {
    const { url, validity, shortcode } = req.body;
    try {
      new URL(url);
    } catch (err) {
      return res.status(400).json({ error: 'Invalid or missing original URL' });
    }

    let code = shortcode;
    if (shortcode) {
      const isValid = /^[a-zA-Z0-9]{4,10}$/.test(shortcode);
      if (!isValid) {
        return res.status(400).json({ error: 'Shortcode must be alphanumeric and 4–10 characters' });
      }
      if (getUrl(shortcode)) {
        return res.status(409).json({ error: 'Shortcode already in use' });
      }
    }
    if (!code) {
      do {
        code = generateShortCode();
      } while (getUrl(code));
    }
    const expiryTime = Date.now() + ((validity || DEFAULT_EXPIRY_MINUTES) * 60000);
    saveUrl(code, url, expiryTime);
    return res.status(201).json({
      message: 'Short URL created successfully',
      shortUrl: `http://localhost:3000/${code}`,
      expiresAt: new Date(expiryTime).toISOString()
    });

  } catch (err) {
    console.error('Internal Server Error:', err);
    return res.status(500).json({ error: 'Unexpected server error' });
  }
};