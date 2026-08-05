export default function BottomNav({

  page,

  setPage,

}) {

  const menus = [

    {

      id: "dashboard",

      icon: "🏠",

      label: "Home",

    },

    {

      id: "monitor",

      icon: "📊",

      label: "Monitor",

    },

    {

      id: "pairing",

      icon: "🔗",

      label: "Pairing",

    },

    {

      id: "sessions",

      icon: "📱",

      label: "Sessions",

    },

  ];

  return (

    <nav className="bottom-nav">

      {menus.map((menu) => (

        <button

          key={menu.id}

          className={
            page === menu.id
              ? "nav-item active"
              : "nav-item"
          }

          onClick={() =>
            setPage(menu.id)
          }

        >

          <span className="nav-icon">

            {menu.icon}

          </span>

          <small>

            {menu.label}

          </small>

        </button>

      ))}

    </nav>

  );

}
