import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line react/prop-types
const UserSettings = ({ set, setSet }) => {
  const { user, updateUser, changePassword } = useAuth();
  const [settings, setSettings] = useState({
    email: user?.email || "",
    phone: user?.phone || "",
    oldPassword: "",
    newPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = () => {
    updateUser({ email: settings.email, phone: settings.phone });
    setMessage("Profile updated successfully!");
  };

  const handleChangePassword = () => {
    if (!settings.oldPassword || !settings.newPassword) {
      setMessage("Please fill in all password fields.");
      return;
    }
    changePassword(settings.oldPassword, settings.newPassword);
    setMessage("Password updated successfully!");
    setSettings({ ...settings, oldPassword: "", newPassword: "" });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 shadow-lg max-w-4xl mx-auto bg-white rounded-lg  my-2">
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
        className="w-full bg-blue-500 text-white py-2 rounded mb-4"
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
        className="w-full p-2 border rounded mb-2"
      />

      <input
        type="password"
        name="newPassword"
        placeholder="New Password"
        value={settings.newPassword}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
      />

      <button
        onClick={handleChangePassword}
        className="w-full bg-red-500 text-white py-2 rounded"
      >
        Update Password
      </button>
    </div>
  );
};

export default UserSettings;
