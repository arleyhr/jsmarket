type MenuItem = {
  label: string;
  value: string;
};

type MenuDropdownProps = {
  onClose: () => void;
  onItemClick: (value: string) => void;
  items?: MenuItem[];
};

const MenuDropdown = ({
  onClose,
  onItemClick,
  items = []
}: MenuDropdownProps) => (
  <>
    <div className="fixed inset-0" onClick={onClose} />
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-700 z-10">
      {items.map((item, index) => (
        <a
          key={index}
          href="#"
          className="block px-4 py-2 hover:bg-gray-100"
          onClick={() => onItemClick && onItemClick(item.value)}
        >
          {item.label}
        </a>
      ))}
    </div>
  </>
);

export default MenuDropdown;
