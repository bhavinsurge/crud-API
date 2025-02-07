import UserTable from '../components/UserTable'; // adjust path if necessary

const UsersPage = () => {
  return (
    <div className="container mx-auto p-6 max-w-full items-baseline">
      <h1 className="text-2xl font-semibold mb-4">User Data List</h1>
      <UserTable />
    </div>
  );
};

export default UsersPage;
