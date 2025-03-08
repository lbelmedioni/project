import Link from "next/link";
import Image from "next/image";

const menuItems = [
    {
      title: "MENU",
      items: [
        {
          icon: "/images/saisie.png",
          label: "Tableau de saisie",
          href: "/list/enseignants",
          visible: ["chef de departement", "enseignant"],
        },
        {
          icon: "/images/releves.png",
          label: "Relevés d'heures",
          href: "/list/parents",
          visible: ["chef de departement", "enseignant"],
        },
        {
          icon: "/images/statistiques.png",
          label: "Statistiques",
          href: "/list/subjects",
          visible: ["chef de departement" , "enseignant"],
        },
      ],
    },
    {
      title: "AUTRES",
      items: [
        {
         icon: "/images/logout.png",
          label: "Logout",
          href: "/logout",
          visible: ["admin", "teacher", "student", "parent"],
        },
      ],
    },
  ];
const Menu = () => {
    return ( 
        <div className="mt-4 text-sm">
            {menuItems.map(i=>(
                <div className="lex flex-col gap-2" key={i.title}>
                    <span className="hidden lg:block text-gray-400 font-light my-4">{i.title}</span>
                    {i.items.map(item=>(
                        <Link href={item.href} key={item.label} className="flex item-center justify-center lg:justify-start gap-4 text-gray-500 py-2">
                            <Image src={item.icon} width={20} height={20} alt={item.label}/>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>
            ))}
        </div>
     );
}
 
export default Menu;