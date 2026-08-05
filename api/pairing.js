export default async function handler(req, res) {

  const { sessionId } = req.query;

  if (!sessionId) {

    return res.status(400).json({
      success: false,
      message: "sessionId wajib diisi"
    });

  }

  try {

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/pairing/${encodeURIComponent(sessionId)}`
    );

    const data = await response.json();

    res.status(response.status).json(data);

  } catch (e) {

    res.status(500).json({
      success: false,
      message: "Backend tidak dapat dihubungi",
      error: e.message
    });

  }

}
