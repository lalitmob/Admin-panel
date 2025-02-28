import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from "react";
import useRoles from "@/app/api/rolesApi";

const NewRoleModel = ({ onClose }: { onClose: () => void }) => {
  const [roleInput, setRoleInput] = useState("");
  const [permissions, setPermissions] = useState<
    { resource: string; actions: string[] }[]
  >([]);
  const [data, setData] = useState({
    resource: "",
    actions: [] as string[],
  });

  const [resources, setResources] = useState<string[]>([]);
  const [actions, setActions] = useState<string[]>([]);
  const { fetchTypes, createRole } = useRoles();

  useEffect(() => {
    fetchTypes("resources", setResources);
    fetchTypes("actions", setActions);
  }, []);

  const onRoleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoleInput(e.target.value);
  };
  const onSubmithandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (roleInput.trim()) {
      const payload = {
        name: roleInput,
        permissions: permissions,
      };
      console.log("New Role Added:", payload);
      createRole(payload); 
    }
  };
  const handleActionChange = (action: string) => {
    setData((prevData) => ({
      ...prevData,
      actions: prevData.actions.includes(action)
        ? prevData.actions.filter((a) => a !== action)
        : [...prevData.actions, action],
    }));
  };

  const handlePermission = () => {
    if (!data.resource || data.actions.length === 0) {
      alert("Please select a resource and at least one action.");
      return;
    }

    const permissionExists = permissions.some(
      (perm) => perm.resource === data.resource
    );

    if (!permissionExists) {
      setPermissions([
        ...permissions,
        { resource: data.resource, actions: data.actions },
      ]);
      setData({ resource: "", actions: [] });
    } else {
      alert("This resource is already added!");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="p-6 rounded-lg bg-blue-500 text-white shadow-md w-96 relative">
        <button
          type="button"
          onClick={() => onClose(false)}
          className="absolute top-2 right-2 text-white text-xl"
        >
          <i className="fa-solid fa-xmark cursor-pointer"></i>
        </button>

        <form>
          <label className="block font-semibold mb-1">Role</label>
          <input
            type="text"
            placeholder="Add custom role & press Enter"
            value={roleInput}
            onChange={onRoleInputChange}
            className="w-full p-2 border rounded-md text-black"
          />

          <label className="block font-semibold mt-4 mb-1">Resources</label>
          <select
            className="border shadow-sm shadow-white py-2 rounded-lg w-full text-black"
            value={data.resource}
            onChange={(e) => setData({ ...data, resource: e.target.value })}
          >
            <option value="">Select a resource</option>
            {resources.map((value, index) => (
              <option value={value} key={index}>
                {value}
              </option>
            ))}
          </select>

          <label className="block font-semibold mt-4 mb-1">Actions</label>
          <div className="border p-2 rounded-lg bg-white text-black max-h-40 overflow-y-auto">
            {actions.length > 0 ? (
              actions.map((action, index) => (
                <label
                  key={index}
                  className="flex items-center gap-2 cursor-pointer p-1"
                >
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={data.actions.includes(action)}
                    onChange={() => handleActionChange(action)}
                  />
                  {action}
                </label>
              ))
            ) : (
              <p className="text-gray-500">No actions available</p>
            )}
          </div>

          <button
            onClick={handlePermission}
            type="button"
            className="px-5 py-2 mt-3 rounded-lg bg-white text-black w-full"
          >
            Add Permission
          </button>

          {permissions.length > 0 && (
            <div className="mt-4 p-3 bg-white text-black rounded-lg">
              <h3 className="font-semibold">Added Permissions</h3>
              <ul className="list-disc ml-5 text-sm">
                {permissions.map((perm, index) => (
                  <li key={index}>
                    <span className="font-bold">{perm.resource}:</span>{" "}
                    {perm.actions.join(", ")}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button
            onClick={onSubmithandler}
            className="px-5 py-2 mt-3 rounded-lg bg-white text-black w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewRoleModel;
