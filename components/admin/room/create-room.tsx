import CreateForm from "@/components/admin/room/create-form";

const CreateRoom = () => {
  return (
    <div>
      <h1 className="text-3xl font-black text-gray-800 mb-4">
        Create New Room
      </h1>
      <CreateForm />
    </div>
  );
};

export default CreateRoom;
