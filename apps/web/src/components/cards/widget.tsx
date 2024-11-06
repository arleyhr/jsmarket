import { IconChevronDown } from '@tabler/icons-react';

interface WidgetCardProps {
  isEmpty?: boolean;
  children?: React.ReactNode;
  emptyComponent?: React.ReactNode;
  title: string;
  viewAllButton?: boolean;
  onViewAllClick?: () => void;
  viewShowAll?: boolean;
  onShowAllClick?: () => void;
}

const WidgetCard = ({
  isEmpty,
  children,
  emptyComponent,
  title,
  viewAllButton,
  onViewAllClick,
  viewShowAll,
  onShowAllClick,
}: WidgetCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {viewAllButton && (
          <button className="text-sm text-gray-500 hover:text-gray-600 hover:underline" onClick={() => onViewAllClick && onViewAllClick()}>
            View all
          </button>
        )}
      </div>

      {!isEmpty ? <div className="space-y-6">{children}</div> : emptyComponent}
      {viewShowAll && (
        <button
          onClick={() => onShowAllClick && onShowAllClick()}
          className="flex items-center justify-center w-full mt-4 text-gray-500 hover:text-gray-600"
        >
          <span>Show All</span>
          <IconChevronDown />
        </button>
      )}
    </div>
  );
};

export default WidgetCard;
