import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const HouseUploadForm = ({ agent }) => {
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      price_type: "",
      location: "",
      description: "",
      bedrooms: "",
      bathrooms: "",
      dimension: "",
      propertyType: "",
      year_built: "",
      furnishing: "",
      amenities: "",
      date_listed: "",
      agent_id: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      price: Yup.string().required("Required"),
      price_type: Yup.string().required("Required"),
      location: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      bedrooms: Yup.number().min(1).required("Required"),
      bathrooms: Yup.number().min(1).required("Required"),
      dimension: Yup.string().required("Required"),
      propertyType: Yup.string().required("Required"),
      agent_id: Yup.string().required("Required"),
      year_built: Yup.string().required("Required"),
      furnishing: Yup.string().required("Required"),
      amenities: Yup.string().notRequired("optinal"),
      date_listed: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log({ ...values, images, video });
      alert("Form Submitted Successfully!");
    },
  });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 20) {
      alert("Maximum of 20 images allowed!");
      return;
    }
    setImages([...images, ...files]);
  };

  const handleVideoUpload = (e) => {
    setVideo(e.target.files[0]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">
        Upload House Details
      </h2>

      <form onSubmit={formik.handleSubmit} className="grid gap-4">
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          {...formik.getFieldProps("title")}
          className="border p-2 rounded-md w-full"
        />
        {formik.touched.title && formik.errors.title && (
          <p className="text-red-500">{formik.errors.title}</p>
        )}

        {/* Price */}

        <input
          type="text"
          name="price"
          placeholder="Price (#)"
          {...formik.getFieldProps("price")}
          className="border p-2 rounded-md w-full"
        />
        {formik.touched.price && formik.errors.price && (
          <p className="text-red-500">{formik.errors.price}</p>
        )}
        {/* {Pricing type} */}
        <select
          name="price_type"
          {...formik.getFieldProps("price_type")}
          className="border p-2 rounded-md w-full"
        >
          <option value="">Select Pricing Type</option>
          <option value="Apartment">daily</option>
          <option value="House">monthly</option>
          <option value="Condo">yearly</option>
        </select>
        {/* Location */}
        <input
          type="text"
          name="location"
          placeholder="Location"
          {...formik.getFieldProps("location")}
          className="border p-2 rounded-md w-full"
        />
        {formik.touched.location && formik.errors.location && (
          <p className="text-red-500">{formik.errors.location}</p>
        )}

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          {...formik.getFieldProps("description")}
          className="border p-2 rounded-md w-full h-24"
        />
        {formik.touched.description && formik.errors.description && (
          <p className="text-red-500">{formik.errors.description}</p>
        )}

        {/* Bedrooms, Bathrooms, Dimensions */}
        <div className="sm:flex gap-2">
          <input
            type="number"
            name="bedrooms"
            placeholder="Bedrooms"
            {...formik.getFieldProps("bedrooms")}
            className="border p-2 rounded-md w-full"
          />
          <input
            type="number"
            name="bathrooms"
            placeholder="Bathrooms"
            {...formik.getFieldProps("bathrooms")}
            className="border p-2 rounded-md w-full"
          />
          <div className="flex sm:block">
            <label className="text-xs">Year built:</label>
            <input
              type="date"
              name="year_built"
              placeholder="Year Built"
              {...formik.getFieldProps("year_built")}
              className="border p-2 rounded-md w-full"
            />
          </div>

          <select
            name="furnishing"
            {...formik.getFieldProps("furnishing")}
            className="border p-2 rounded-md w-full"
          >
            <option value="">Furnished?</option>
            <option value="Apartment">Not furnished</option>
            <option value="House">Semi Furnished</option>
            <option value="Condo">Fully furnished</option>
          </select>
        </div>
        <input
          type="text"
          name="dimension"
          placeholder="Dimensions (e.g., 1200 sq ft)"
          {...formik.getFieldProps("dimension")}
          className="border p-2 rounded-md w-full"
        />
        {formik.touched.dimension && formik.errors.dimension && (
          <p className="text-red-500">{formik.errors.dimension}</p>
        )}
        <input
          type="text"
          name="amenities"
          placeholder="Amenities (e.g., gym, wifi, security... separate each item with a comma ',')"
          {...formik.getFieldProps("amenities")}
          className="border p-2 rounded-md w-full"
        />
        {formik.touched.dimension && formik.errors.dimension && (
          <p className="text-red-500">{formik.errors.dimension}</p>
        )}

        {/* Property Type */}
        <select
          name="propertyType"
          {...formik.getFieldProps("propertyType")}
          className="border p-2 rounded-md w-full"
        >
          <option value="">Select Property Type</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Condo">Condo</option>
          <option value="Condo">Office</option>
          <option value="Villa">Villa</option>
        </select>
        {formik.touched.propertyType && formik.errors.propertyType && (
          <p className="text-red-500">{formik.errors.propertyType}</p>
        )}

        {/* Agent Info */}

        <input
          type="text"
          name="agent_id"
          hidden
          {...formik.getFieldProps("agent_id")}
          value={agent.id}
        />

        {/* Image Upload */}
        <label className="block font-semibold mt-2">
          Upload House Images (Min: 6, Max: 20)
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="border p-2 w-full rounded-md"
        />
        {images.length < 6 && (
          <p className="text-red-500">At least 6 images are required.</p>
        )}

        {/* Video Upload */}
        <label className="block font-semibold mt-2">
          Upload Short Video (Optional)
        </label>
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          className="border p-2 w-full rounded-md"
        />

        {/* Preview Uploaded Images */}
        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {images.map((img, index) => (
              <img
                key={index}
                src={URL.createObjectURL(img)}
                alt="Preview"
                className="w-full h-24 object-cover rounded-md"
              />
            ))}
          </div>
        )}

        {/* Preview Uploaded Video */}
        {video && (
          <video controls className="w-full mt-2">
            <source src={URL.createObjectURL(video)} type={video.type} />
          </video>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Submit Listing
        </button>
      </form>
    </div>
  );
};

export default HouseUploadForm;
