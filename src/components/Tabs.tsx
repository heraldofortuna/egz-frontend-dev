import { useEffect, useState } from 'react';
import Card from '@components/container/Card';
import Skeleton from '@components/Skeleton';
import { TabData, TabsData } from '@customtypes/components';

interface ITabsProps {
  title: string;
  data: TabsData;
  selectedTab: string;
  isLoading?: boolean;
  onTabChange: (tabId: string) => void;
}

const Tabs = ({
  title,
  selectedTab,
  data,
  isLoading = false,
  onTabChange,
}: ITabsProps) => {
  const [filteredData, setFilteredData] = useState<TabsData>(data);

  useEffect(() => {
    if (isLoading) return;

    const filteredData = data.filter((item: TabData) => item.isShowed);

    setFilteredData(filteredData);

    if (
      filteredData.length &&
      !filteredData.some((item: any) => item.id === selectedTab)
    ) {
      onTabChange(filteredData[0].id);
    }
  }, [data, selectedTab, isLoading, onTabChange]);

  return (
    <>
      <Card title={title}>
        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          {isLoading ? (
            <div
              className={`px-[16px] md:px-[24px] py-[8px] md:py-[12px] border border-gray-color-2 rounded-[24px]`}
            >
              <Skeleton className="w-[60px] md:w-[80px] h-[20px] md:h-[23px]" />
            </div>
          ) : (
            <>
              {filteredData.map((item: any) => {
                return (
                  <div
                    key={item.id}
                    className={`px-[16px] md:px-[24px] py-[8px] md:py-[12px] border ${selectedTab === item.id ? 'border-white' : 'border-gray-color-2'} rounded-[24px] cursor-pointer transition-regular hover:border-white`}
                    onClick={() => onTabChange(item.id)}
                  >
                    <span className="text-sm md:text-base">{item.label}</span>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </Card>
      {filteredData.find((item) => item.id === selectedTab)?.content || null}
    </>
  );
};

export default Tabs;
