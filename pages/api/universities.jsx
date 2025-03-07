export default function handler(req, res) {
    if (req.method === 'GET') {
      res.status(200).json([
        { name: "Université de Chlef", logo: "/logos/uhbc.png" },
        { name: "Université d'Alger", logo: "/logos/univ_alger.png" }
      ]);
    } else {
      res.status(405).json({ message: "Méthode non autorisée" });
    }
  }
  