import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faLock,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line react/prop-types
const UserSettings = ({ set, setSet }) => {
  const { user, updateUser, token } = useAuth();
  const [showPassWord, setShowPassWord] = useState(false);
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

      if (!res.ok) throw new Error("Failed to create account");
    } catch (err) {
      console.log(err);
      setMessage(err.Error);
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
    <div className="bg-white dark:bg-gray-800 p-6 shadow-lg max-w-4xl mx-auto rounded-lg  my-2">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4">User Settings</h2>
        <button onClick={() => setSet(!set)} className="text-red-600 text-lg">
          <FontAwesomeIcon icon={faTimesCircle} /> Close
        </button>
      </div>

      {message && <p className="text-green-500">{message}</p>}

      {/* Email & Phone Update */}
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-200">Email</label>
        <input
          type="email"
          name="email"
          value={settings.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-200">Phone</label>
        <input
          type="text"
          name="phone"
          value={settings.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        onClick={handleUpdateProfile}
        className="w-full bg-gray-500 text-white py-2 rounded mb-4"
        disabled
      >
        Update Profile
      </button>

      {/* Change Password */}
      <h3 className="text-lg font-semibold mb-2">Change Password</h3>

      <input
        type="password"
        name="oldPassword"
        placeholder="Current Password"
        value={settings.oldPassword}
        onChange={handleChange}
        className="w-full p-2 px-8 border rounded mb-2"
      />
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center text-gray-500">
          <FontAwesomeIcon icon={faLock} color="lightblue" />
        </div>
        <input
          type={showPassWord ? "text" : "password"}
          name="newPassword"
          placeholder="New Password"
          value={settings.newPassword}
          onChange={handleChange}
          className="w-full p-2 px-8 border rounded mb-2"
        />
        <button
          type="button"
          onClick={() => setShowPassWord(!showPassWord)}
          className="absolute inset-y-0 right-5 flex items-center text-gray-500"
        >
          <FontAwesomeIcon icon={showPassWord ? faEye : faEyeSlash} />
        </button>
      </div>
      <div className="relative mb-3">
        <div className="absolute inset-y-0 left-3 flex items-center text-gray-500">
          <FontAwesomeIcon icon={faLock} color="lightblue" />
        </div>
        <input
          type={showconPassWord ? "text" : "password"}
          name="confirmNewPassword"
          placeholder="Confirm New Password"
          value={settings.confirmNewPassword}
          onChange={handleChange}
          className="w-full p-2 px-8 border rounded mb-2"
        />
        <button
          type="button"
          onClick={() => setShowconPassWord(!showconPassWord)}
          className="absolute inset-y-0 right-5 flex items-center text-gray-500"
        >
          <FontAwesomeIcon icon={showconPassWord ? faEye : faEyeSlash} />
        </button>
      </div>
      <button
        onClick={handleChangePassword}
        className="w-full bg-red-500 text-white py-2 rounded"
      >
        {updating ? "updating..." : "Update Password"}
      </button>
    </div>
  );
};

export default UserSettings;
