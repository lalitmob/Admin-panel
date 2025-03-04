import React, { useState, useEffect, ChangeEvent } from "react";
import useRoles from "@/app/api/rolesApi";

const NewRoleModel = ({ onClose }: { onClose: (data : boolean) => boolean }) => {
  const [roleInput, setRoleInput] = useState("");
  const [permissions, setPermissions] = useState<
    { resource: string; actions: string[] }[]
  >([]);
  const [data, setData] = useState({ resource: "", actions: [] as string[] });
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

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (roleInput.trim()) {
      const payload = { name: roleInput, permissions };
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
      setPermissions([...permissions, { resource: data.resource, actions: data.actions }]);
      setData({ resource: "", actions: [] });
    } else {
      alert("This resource is already added!");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
      <div className="p-6 rounded-xl bg-white shadow-lg w-[400px] relative">
        <button
          type="button"
          onClick={()=>onClose(false)}
          className="absolute top-3 right-3 text-gray-700 hover:text-red-500 transition"
        >
          <i className="fa-solid fa-xmark text-2xl"></i>
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create New Role</h2>

        <form onSubmit={onSubmitHandler}>
          <label className="block font-medium text-gray-700 mb-1">Role Name</label>
          <input
            type="text"
            placeholder="Enter role name"
            value={roleInput}
            onChange={onRoleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <label className="block font-medium text-gray-700 mt-4 mb-1">Resource</label>
          <select
            className="border border-gray-300 rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500 outline-none"
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

          <label className="block font-medium text-gray-700 mt-4 mb-1">Actions</label>
          <div className="border p-3 rounded-lg bg-gray-100 text-gray-900 max-h-40 overflow-y-auto">
            {actions.length > 0 ? (
              actions.map((action, index) => (
                <label key={index} className="flex items-center gap-2 cursor-pointer p-1">
                  <input
                    type="checkbox"
                    checked={data.actions.includes(action)}
                    onChange={() => handleActionChange(action)}
                    className="cursor-pointer"
                  />
                  {action}
                </label>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No actions available</p>
            )}
          </div>

          <button
            onClick={handlePermission}
            type="button"
            className="w-full mt-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
          >
            Add Permission
          </button>

          {permissions.length > 0 && (
            <div className="mt-4 p-3 bg-gray-50 border border-gray-300 rounded-lg">
              <h3 className="font-semibold text-gray-700">Added Permissions</h3>
              <ul className="list-disc ml-5 text-gray-800 text-sm">
                {permissions.map((perm, index) => (
                  <li key={index}>
                    <span className="font-bold">{perm.resource}:</span> {perm.actions.join(", ")}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewRoleModel;
