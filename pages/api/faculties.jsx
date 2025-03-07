export default function handler(req, res) {
    if (req.method === 'GET') {
      const { university } = req.query;
      
      const facultiesData = {
        "Université de Chlef": [
          { name: "Faculté des Sciences", logo: "/logos/fac_sciences.png" },
          { name: "Faculté d'Informatique", logo: "/logos/informatique.png" }
        ],
        "Université d'Alger": [
          { name: "Faculté de Médecine", logo: "/logos/fac_medecine.png" },
          { name: "Faculté de Droit", logo: "/logos/fac_droit.png" }
        ]
      };
  
      res.status(200).json(facultiesData[university] || []);
    } else {
      res.status(405).json({ message: "Méthode non autorisée" });
    }
  }
  