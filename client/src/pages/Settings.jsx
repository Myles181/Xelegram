import React from "react";
import { useDispatch } from "react-redux";
import Header from "../components/globals/Header";
import IconWrapper from "../components/globals/IconWrapper";
import ActivePage from "../components/pages/Sidebar/ActivePage";
import useSettings from "../hooks/useSettings";
import { sidebarActions } from "../store/sidebarSlice";
import { modalActions } from "../store/modalSlice";
import Image from "../components/globals/Image";
import LogoutModal from "../components/pages/Settings/LogoutModal";

function Settings() {
  const dispatch = useDispatch();
  const { user } = useSettings();

  const links = [
    {
      name: "General Settings",
      action: () => console.log("Navigate to Account"),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="50"
          height="50"
          viewBox="0 0 50 50"
        >
          <path d="M47.16,21.221l-5.91-0.966c-0.346-1.186-0.819-2.326-1.411-3.405l3.45-4.917c0.279-0.397,0.231-0.938-0.112-1.282 l-3.889-3.887c-0.347-0.346-0.893-0.391-1.291-0.104l-4.843,3.481c-1.089-0.602-2.239-1.08-3.432-1.427l-1.031-5.886 C28.607,2.35,28.192,2,27.706,2h-5.5c-0.49,0-0.908,0.355-0.987,0.839l-0.956,5.854c-1.2,0.345-2.352,0.818-3.437,1.412l-4.83-3.45 c-0.399-0.285-0.942-0.239-1.289,0.106L6.82,10.648c-0.343,0.343-0.391,0.883-0.112,1.28l3.399,4.863 c-0.605,1.095-1.087,2.254-1.438,3.46l-5.831,0.971c-0.482,0.08-0.836,0.498-0.836,0.986v5.5c0,0.485,0.348,0.9,0.825,0.985 l5.831,1.034c0.349,1.203,0.831,2.362,1.438,3.46l-3.441,4.813c-0.284,0.397-0.239,0.942,0.106,1.289l3.888,3.891 c0.343,0.343,0.884,0.391,1.281,0.112l4.87-3.411c1.093,0.601,2.248,1.078,3.445,1.424l0.976,5.861C21.3,47.647,21.717,48,22.206,48 h5.5c0.485,0,0.9-0.348,0.984-0.825l1.045-5.89c1.199-0.353,2.348-0.833,3.43-1.435l4.905,3.441 c0.398,0.281,0.938,0.232,1.282-0.111l3.888-3.891c0.346-0.347,0.391-0.894,0.104-1.292l-3.498-4.857 c0.593-1.08,1.064-2.222,1.407-3.408l5.918-1.039c0.479-0.084,0.827-0.5,0.827-0.985v-5.5C47.999,21.718,47.644,21.3,47.16,21.221z M25,32c-3.866,0-7-3.134-7-7c0-3.866,3.134-7,7-7s7,3.134,7,7C32,28.866,28.866,32,25,32z"></path>
        </svg>
      ),
    },
    {
      name: "Notifications and Sounds",
      action: () => console.log("Navigate to Notifications and Sounds"),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="50"
          height="50"
          viewBox="0 0 24 24"
        >
          <path d="M 12 2 C 11.172 2 10.5 2.672 10.5 3.5 L 10.5 4.1953125 C 7.9131836 4.862095 6 7.2048001 6 10 L 6 16 L 4.4648438 17.15625 L 4.4628906 17.15625 A 1 1 0 0 0 4 18 A 1 1 0 0 0 5 19 L 12 19 L 19 19 A 1 1 0 0 0 20 18 A 1 1 0 0 0 19.537109 17.15625 L 18 16 L 18 10 C 18 7.2048001 16.086816 4.862095 13.5 4.1953125 L 13.5 3.5 C 13.5 2.672 12.828 2 12 2 z M 10 20 C 10 21.1 10.9 22 12 22 C 13.1 22 14 21.1 14 20 L 10 20 z"></path>
        </svg>
      ),
    },

    {
      name: "Data and Storage",
      action: () => console.log("Navigate to Data and Storage"),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-database"
        >
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5V19A9 3 0 0 0 21 19V5" />
          <path d="M3 12A9 3 0 0 0 21 12" />
        </svg>
      ),
    },
    {
      name: "Privacy and Security",
      action: () => console.log("Navigate to Privacy and Security"),
    },
    { name: "Appearance", action: () => console.log("Navigate to Appearance") },
    { name: "Help", action: () => console.log("Navigate to Help") },
    {
      name: "Log Out",
      action: () =>
        dispatch(
          modalActions.openModal({
            type: "logoutModal",
            positions: { top: 50, right: 15 },
          })
        ),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M16 13v-2H7.83l2.88-2.88L9.29 6.7 4 12l5.29 5.3 1.41-1.42L7.83 13H16zm2-10H6v2h12V3zm0 16H6v2h12v-2z" />
        </svg>
      ),
    },
  ];

  return (
    <ActivePage
      activePageName="settings"
      className="custom-scrollbar overflow-y-scroll flex flex-col"
    >
      <Header className="px-[1.5rem] py-4 flex items-center justify-between w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <IconWrapper
              onClick={() =>
                dispatch(
                  sidebarActions.changeActivePage({ newActivePage: "chatList" })
                )
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23a1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2Z"
                  className="stroke-transparent"
                />
              </svg>
            </IconWrapper>
            <h2 className="text-[2rem] font-semibold ml-[3rem]">Settings</h2>
          </div>
          <div className="flex items-center">
            <IconWrapper
              onClick={() =>
                dispatch(
                  modalActions.openModal({
                    type: "logoutModal",
                    positions: { top: 50, right: 15 },
                  })
                )
              }
              className="ml-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M 19.171875 2 C 18.448125 2 17.724375 2.275625 17.171875 2.828125 L 16 4 L 20 8 L 21.171875 6.828125 C 22.275875 5.724125 22.275875 3.933125 21.171875 2.828125 C 20.619375 2.275625 19.895625 2 19.171875 2 z M 14.5 5.5 L 3 17 L 3 21 L 7 21 L 18.5 9.5 L 14.5 5.5 z"></path>
              </svg>
            </IconWrapper>
            <IconWrapper
              onClick={() =>
                dispatch(
                  modalActions.openModal({
                    type: "logoutModal",
                    positions: { top: 50, right: 15 },
                  })
                )
              }
              className="ml-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0zm0-6a2 2 0 1 0 4 0a2 2 0 0 0-4 0zm0 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0z"
                />
              </svg>
            </IconWrapper>
          </div>
        </div>
      </Header>
      {user && (
        <>
          {/* Avatar */}
          <div className="relative">
            <Image
              src={user.avatar}
              alt={user.username}
              className="w-full h-[35rem] object-cover"
            />
            <div className="absolute bottom-0 ml-6 mb-6">
              <p className="font-semibold text-[25px]">{user.name}</p>
              <p>{user.status?.online ? "online" : "offline"}</p>
            </div>
          </div>

          {/* Links */}
          <div className="mt-[3rem] px-[1.5rem] flex flex-col gap-[2rem]">
            {links.map((link, index) => (
              <div
                key={index}
                onClick={link.action}
                className="cursor-pointer text-[1.8rem] font-semibold text-white p-[1rem] hover:bg-gray-400 hover:bg-opacity-10 rounded-lg flex items-center gap-4"
              >
                <span>{link.icon}</span>
                <span>{link.name}</span>
              </div>
            ))}
          </div>
        </>
      )}
      <LogoutModal />
    </ActivePage>
  );
}

export default Settings;
