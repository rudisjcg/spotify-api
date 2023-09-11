export default async function Handler(req, res) {
  const url = 'https://api.spotify.com/v1/me';
  const { accessToken } = req.body;

  if (req.method === 'POST') {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const data = await response.json();
       // Aquí puedes procesar los datos de respuesta

      // Envía una respuesta al cliente con los datos
      res.status(200).json(data);
    } catch (error) {
    
      // Envía una respuesta de error al cliente en caso de error
      res.status(500).json({ error: 'Hubo un error en la solicitud' });
    }
  } else {
    // Envía una respuesta de error al cliente si el método no es POST
    res.status(405).json({ error: 'Método no permitido' });
  }
}
