import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line react/prop-types
const UserSettings = ({ set, setSet }) => {
  const { user, updateUser, token } = useAuth();
  const [showPassWord, setShowPassWord] = useState(false);
  const [showOPassWord, setShowOPassWord] = useState(false);
  const [showconPassWord, setShowconPassWord] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [settings, setSettings] = useState({
    email: user?.email || "",
    phone: user?.phone || "",
    oldPassword: user.password || "",
    newPassword: user.password || "",
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
        `https://backend.realestway.com/api/users/${user.id}`,
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
    <div className="py-6 px-4 font-poppins">
      <h2 className="text-xl flex justify-between items-center">
        <span> Personal Information</span>
        <button
          className="p-2 sm:pr-4 flex items-center text-sm gap-1 border-[#9692ad] border-[1px] rounded-md text-[#3D3D3D]"
          onClick={() => setSet(!set)}
        >
          Done
        </button>
      </h2>
      <div className="mt-4 w-[90%] text-sm md:text-[1em] md:w-5/6 flex flex-col gap-3 text-[#3D3D3D]">
        <p className="grid grid-cols-[1fr_2fr]">
          <span>Name</span>
          <input
            value={user?.fullName}
            disabled
            className="bg-[#F4F4F4] px-3 py-1 border-[#B7B7B7] border-[1px]"
          />
        </p>
        <p className="grid grid-cols-[1fr_2fr]">
          <span>Email</span>
          <input
            value={user?.email}
            disabled
            className="bg-[#F4F4F4] px-3 py-1 border-[#B7B7B7] border-[1px]"
          />
        </p>
        <p className="grid grid-cols-[1fr_2fr]">
          <span>Phone</span>
          <input
            value={user?.phone}
            disabled
            className="bg-[#F4F4F4] px-3 py-1 border-[#B7B7B7] border-[1px]"
          />
        </p>

        <h3 className="text-xl flex justify-between items-center mt-3">
          Change Password
        </h3>
        <div className="relative">
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
        <div className="relative">
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
        <div className="relative mb-3">
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
        {message && <p className="text-[#100073]">{message}</p>}
        <button
          onClick={handleChangePassword}
          className="md:w-1/3 w-2/3 font-montserrat bg-[#00a256] text-white py-2 rounded-lg text-xs md:text-sm"
        >
          {updating ? "updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
};

export default UserSettings;
