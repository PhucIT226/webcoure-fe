import { useState } from "react";
import { FaCamera } from "react-icons/fa";

const mockUser = {
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "0987654321",
  address: "123 Main St, City, Country",
};

function Profile() {
  const [user, setUser] = useState(mockUser);
  const [form, setForm] = useState(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, avatar: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body items-center">
          <div className="avatar mb-4 relative group">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
              <img src={form.avatar} alt="avatar" />
            </div>
            <label className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white rounded-full p-2 cursor-pointer shadow transition-opacity opacity-0 group-hover:opacity-100 flex items-center">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
              <FaCamera className="text-lg" />
            </label>
          </div>
          <form className="w-full space-y-3" onSubmit={handleSave}>
            <div>
              <label className="label">Name</label>
              <input
                className="input input-bordered w-full"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="label">Email</label>
              <input
                className="input input-bordered w-full"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="label">Phone</label>
              <input
                className="input input-bordered w-full"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label">Address</label>
              <input
                className="input input-bordered w-full"
                name="address"
                value={form.address}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-4 w-full">
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
