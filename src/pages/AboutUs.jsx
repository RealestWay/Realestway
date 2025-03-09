import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/AuthContext";

const AboutUs = () => {
  const { user } = useAuth;
  console.log(user);
  return (
    <div>
      {/* {users.map((u) => (
        <>{u.id}</>
      ))} */}
      <PageNav />
      <div>
        We are building digital solution for most easy housing and real estate
        service and product accesibility worldwide. Short let and long time
        apartment renting, real estate property acquisition and leasing at any
        location from any location at the tip of your finger. This is a real
        Estate Market Place!.
      </div>
    </div>
  );
};

export default AboutUs;
