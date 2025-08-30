import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";

export default function SaleListingForm({ locationData }) {
  const { token } = useAuth();
  console.log(token);
  // Store all details + files in one state
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    sub_category: "",
    bedrooms: "",
    bathrooms: "",
    address: "",
    city: "",
    state: "",
    land_size: "",
    price: "",
    latitude: locationData?.latitude || "",
    longitude: locationData?.longitude || "",
    images: [],
    video: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setForm({
      ...form,
      [name]: name === "images" ? files : files[0], // multiple for images, single for video
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "images" && value?.length) {
        Array.from(value).forEach((file) => {
          formData.append("images[]", file);
        });
      } else if (key === "video" && value) {
        formData.append("video", value);
      } else {
        formData.append(key, value);
      }
    });

    await fetch("https://backend.realestway.com/api/sale-listings", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    alert("Property Submitted Successfully!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold text-[#100073]">
        Property Details & Media
      </h2>

      {/* Property Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Beautiful 4-bedroom duplex"
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">Select category</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="land">Land</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Sub Category</label>
          <select
            name="sub_category"
            value={form.sub_category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">Select sub-category</option>
            <option value="detached-duplex">Detached Duplex</option>
            <option value="semi-detached">Semi-Detached</option>
            <option value="terraced">Terraced</option>
            <option value="flat">Flat</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Bedrooms</label>
          <input
            name="bedrooms"
            type="number"
            value={form.bedrooms}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Bathrooms</label>
          <input
            name="bathrooms"
            type="number"
            value={form.bathrooms}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Land Size (sqm)</label>
          <input
            name="land_size"
            value={form.land_size}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Price (₦)</label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border rounded-md"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">City</label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">State</label>
          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
      </div>

      {/* Media Upload */}
      <div>
        <h3 className="text-lg font-semibold">Upload Media</h3>
        <label className="block text-sm font-medium">Images</label>
        <input
          type="file"
          name="images"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full"
        />

        <label className="block text-sm font-medium mt-4">Video</label>
        <input
          type="file"
          name="video"
          accept="video/*"
          onChange={handleFileChange}
          className="block w-full"
        />
      </div>

      <button
        type="submit"
        className="px-6 py-3 bg-[#00a256] text-white rounded-md hover:bg-[#008c4a] transition-colors w-full"
      >
        Submit Listing
      </button>
    </form>
  );
}
