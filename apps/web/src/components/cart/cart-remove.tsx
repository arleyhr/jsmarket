import { IconTrash } from '@tabler/icons-react';

type RemoveButtonProps = {
  onClick: () => void;
};

const RemoveButton = ({ onClick }: RemoveButtonProps) => (
  <button
    onClick={onClick}
    className="text-gray-500 hover:text-gray-700 inline-flex items-center border rounded-md p-1"
  >
    <IconTrash size={18} />
  </button>
);

export default RemoveButton;
