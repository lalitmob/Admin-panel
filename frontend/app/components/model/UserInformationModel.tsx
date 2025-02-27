import React from "react";
import { navProfileModelOptions as options } from "@/app/constants/navcont";
import useAuth from "@/app/api/Auth.api";
import { useAppDispatch } from "@/app/lib/hooks";
import { userModelTrigger } from "@/app/lib/features/Model/triggerSlice";
import { useRouter, usePathname } from "next/navigation";
const UserInformationModel = ({ modelRef }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();
  const dispatch = useAppDispatch();
  const handlelogout = () => {
    logout();
  };

  const handleClick = (data: string) => {
    dispatch(userModelTrigger(data));
    if (pathname !== "/admin") {
      router.push("/admin");
    }
  };
  return (
    <div
      ref={modelRef}
      className="bg-white flex absolute z-20 left-20 w-[250px] rounded-xl gap-3 px-3 py-4"
    >
      <div className="flex flex-col gap-4">
        {options.icons.map((data, index) => (
          <div key={index}>
            <i className={`${data} text-gray-500 text-lg`} />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 mb-5">
        {options.fields.map((data, index) => (
          <div key={index} className="text-black font-bold capitalize">
            {data === "Logout" ? (
              <button onClick={handlelogout}>{data}</button>
            ) : (
              <button onClick={() => handleClick(data)}>{data}</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserInformationModel;
