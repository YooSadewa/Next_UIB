import ActiveLink from "./ActiveLink";

export default function Navbar() {
  const routes = [
    { name: "Home", path: "/" },
    { name: "Laboratorium Facility", path: "/laboratorium" },
    { name: "Network Facility", path: "/network" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="flex justify-between p-[30px] bg-gray-900 text-white font-bold items-center">
      <h1 className="text-[20px]">Next.js Facilities</h1>
      <ul className="flex gap-5">
        {routes.map((route) => (
          <li key={route.path}>
            <ActiveLink href={route.path}>{route.name}</ActiveLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
