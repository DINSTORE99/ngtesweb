export default async function handler(req, res) {
  try {

    const response = await fetch(
      `${process.env.BACKEND_URL}/health`
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
