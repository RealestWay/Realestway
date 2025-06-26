import { Edit2 } from "iconsax-reactjs";
import { useAuth } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const AgentAccount = () => {
  const { agent, updateUser, token } = useAuth();

  const [showPassWord, setShowPassWord] = useState(false);
  const [showOPassWord, setShowOPassWord] = useState(false);
  const [showconPassWord, setShowconPassWord] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [settings, setSettings] = useState({
    email: agent?.email || "",
    phone: agent?.phone || "",
    oldPassword: agent.password || "",
    newPassword: agent.password || "",
    confirmNewPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const updatePassword = async () => {
    setUpdating(true);
    setMessage(""); // clear previous messages

    try {
      const res = await fetch(
        `https://backend.realestway.com/api/users/${agent.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            password: settings.newPassword,
            password_confirmation: settings.confirmNewPassword,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update password");
      }

      setMessage(data.message || "Password updated successfully");
    } catch (err) {
      setMessage(err.message || "Something went wrong");
    } finally {
      setUpdating(false);
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateUser({ email: settings.email, phone: settings.phone });
    setMessage("Profile updated successfully!");
  };

  const handleChangePassword = () => {
    if (!settings.oldPassword || !settings.newPassword) {
      setMessage("Please fill in all password fields.");
      return;
    }
    if (settings.newPassword !== settings.confirmNewPassword) {
      setMessage("New password does not match, check again.");
      return;
    }
    updatePassword();

    setSettings({
      ...settings,
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  return (
    <>
      <div className="w-[95%] md:w-[90%] mx-auto rounded-lg my-3 mt-8 border-[1px] bg-[#FBFDFF] shadow-sm border-[#9692ad]">
        <div className="p-6">
          {" "}
          <h2 className="text-2xl flex justify-between items-center">
            <span> Personal Information</span>
            <button
              className="p-2 sm:pr-4 flex items-center text-sm gap-1 border-[#9692ad] border-[1px] rounded-md text-black"
              // onClick={() => setSettings(!settings)}
            >
              <Edit2 color="#9692ad" variant="Bold" size={18} /> Edit
            </button>
          </h2>
          <img
            src="/cs-realestway.png"
            alt="profile pic"
            width={70}
            height={70}
            className="rounded-[50%] my-4"
          />
          <div className="mt-4 w-[80%] md:w-2/5 flex flex-col md:grid md:grid-cols-2 md:gap-6">
            <p className="flex flex-col gap-2">
              <span className="text-sm text-[#3D3D3D]">Name</span>{" "}
              {agent?.fullName}
            </p>
            <p className="flex flex-col gap-2">
              <span className="text-sm text-[#3D3D3D]">Email</span>{" "}
              {agent?.email}
            </p>
            <p className="flex flex-col gap-2">
              <span className="text-sm text-[#3D3D3D]">Phone</span>{" "}
              {agent?.phone}
            </p>

            {agent?.companyName && (
              <p className="flex flex-col gap-2">
                <span className="text-sm text-[#3D3D3D]">Company</span>{" "}
                {agent?.companyName}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="w-[95%] md:w-[90%] mx-auto rounded-lg my-3 mt-8 border-[1px] bg-[#FBFDFF] shadow-sm border-[#9692ad]">
        <div className="p-6 flex flex-col gap-3">
          <div className="flex justify-between">
            <h3 className="text-xl flex justify-between items-center mt-3">
              Security
            </h3>
            <button
              onClick={handleChangePassword}
              className="text border-[1px] border-[#9692ad] p-3 rounded-lg flex justify-between items-center mt-3"
            >
              {updating ? "updating..." : "Update Password"}
            </button>
          </div>
          <div className="relative text-sm">
            <p className="grid grid-cols-[1fr_2fr]">
              <span>Old Password</span>
              <input
                type={showOPassWord ? "text" : "password"}
                name="oldPassword"
                placeholder="Current Password"
                value={settings.oldPassword}
                onChange={handleChange}
                className="bg-[#F4F4F4] px-3 py-2 rounded-sm border-[#B7B7B7] border-[1px]"
              />
            </p>
            <button
              type="button"
              onClick={() => setShowOPassWord(!showOPassWord)}
              className="absolute inset-y-0 right-5 flex items-center font-montserrat text-gray-500"
            >
              <FontAwesomeIcon icon={showOPassWord ? faEye : faEyeSlash} />
            </button>
          </div>
          <div className="relative text-sm">
            <p className="grid grid-cols-[1fr_2fr]">
              <span>New Password</span>{" "}
              <input
                type={showPassWord ? "text" : "password"}
                name="newPassword"
                placeholder="New Password"
                value={settings.newPassword}
                onChange={handleChange}
                className="bg-[#F4F4F4] px-3 py-2 rounded-sm border-[#B7B7B7] border-[1px]"
              />
            </p>
            <button
              type="button"
              onClick={() => setShowPassWord(!showPassWord)}
              className="absolute inset-y-0 right-5 flex items-center font-montserrat text-gray-500"
            >
              <FontAwesomeIcon icon={showPassWord ? faEye : faEyeSlash} />
            </button>
          </div>
          <div className="relative mb-3 text-sm">
            <p className="grid grid-cols-[1fr_2fr]">
              <span>Confirm Password</span>{" "}
              <input
                type={showconPassWord ? "text" : "password"}
                name="confirmNewPassword"
                placeholder="Confirm New Password"
                value={settings.confirmNewPassword}
                onChange={handleChange}
                className="bg-[#F4F4F4] px-3 py-2 rounded-sm border-[#B7B7B7] border-[1px]"
              />
            </p>
            <button
              type="button"
              onClick={() => setShowconPassWord(!showconPassWord)}
              className="absolute font-montserrat inset-y-0 right-5 flex items-center text-gray-500"
            >
              <FontAwesomeIcon icon={showconPassWord ? faEye : faEyeSlash} />
            </button>
          </div>
          {message && <p className="text-[#100073] text-center">{message}</p>}
        </div>
      </div>
    </>
  );
};

export default AgentAccount;
