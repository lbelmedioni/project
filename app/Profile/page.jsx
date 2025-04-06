import { FaUser, FaEnvelope, FaUniversity, FaBuilding } from "react-icons/fa";

export default function ProfileCard() {
  const profileData = [
    { icon: FaUser, label: "NOM COMPLET", value: "Admin" },
    { icon: FaEnvelope, label: "EMAIL", value: "admin@admin.com" },
    { icon: FaUniversity, label: "FACULTÉ", value: "Math et Informatique" },
    { icon: FaBuilding, label: "DÉPARTEMENT", value: "Informatique" },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-green-500 p-5 text-center">
            <div className="flex justify-center mb-3">
              <div className="relative">
                <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center">
                  <FaUser className="text-green-500 text-3xl" />
                </div>
                <div className="absolute bottom-1 right-1 bg-green-500 rounded-lg p-1 border-2 border-white">
                  <FaUser className="text-white text-xs" />
                </div>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-white">Admin</h2>
            <p className="text-green-100 text-sm">Professeur</p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profileData.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Icon className="w-7 h-7 text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs text-green-600 font-medium mb-1">{label}</p>
                    <p className="text-sm text-gray-900">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
