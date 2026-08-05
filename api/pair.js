export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed"
    });
  }

  try {

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/pair`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(req.body)
      }
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
