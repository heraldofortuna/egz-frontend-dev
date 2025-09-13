import { useState, useRef, useEffect } from 'react';
import { ModalData, TableData, TableDataItem } from '@customtypes/components';
import Button from '@components/Button';
import Skeleton from '@components/Skeleton';
import Modal from '@components/Modal';

interface ITableProps {
  headers: string[];
  data: TableData;
  buttonData?: any;
  onClickButton?: any;
  isLoadingButton?: boolean;
  isLoading: boolean;
}

const Table = ({
  headers,
  data,
  buttonData,
  onClickButton,
  isLoadingButton,
  isLoading,
}: ITableProps) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const [isScrollable, setIsScrollable] = useState(false);
  const [modalData, setModalData] = useState<ModalData>({
    title: '',
    message: '',
    isOpen: false,
  });

  const handleCloseModal = () => {
    setModalData({ ...modalData, isOpen: false });
  };

  useEffect(() => {
    const checkScrollable = () => {
      if (tableContainerRef.current) {
        setIsScrollable(
          tableContainerRef.current.scrollWidth >
            tableContainerRef.current.clientWidth,
        );
      }
    };
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, [isLoading]);

  return (
    <>
      <div className="relative">
        <div ref={tableContainerRef} className="overflow-x-auto relative">
          <table className="w-full">
            <thead>
              <tr className="h-14">
                {headers.map((header: string, index: number) => (
                  <th
                    key={`table-header-${index}`}
                    colSpan={1}
                    className="table-cell text-center text-sm md:text-base font-medium p-2 border-b border-gray-color-2"
                  >
                    {header}
                  </th>
                ))}
                {buttonData ? (
                  <th
                    key={'table-header-button'}
                    colSpan={1}
                    className="table-cell text-center text-sm md:text-base font-medium p-2 border-b border-gray-color-2"
                  >
                    Pago
                  </th>
                ) : (
                  <></>
                )}
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array.from({ length: 3 }).map((_, trIndex) => (
                    <tr key={`row-${trIndex}`} className="h-14">
                      <td
                        key={`table-cell-loading-${trIndex}`}
                        colSpan={
                          buttonData ? headers.length + 1 : headers.length
                        }
                      >
                        <div className="h-14 md:h-10 flex items-center justify-center">
                          <Skeleton className="w-[90%] h-[16px] md:h-[20px]" />
                        </div>
                      </td>
                    </tr>
                  ))
                : data.map((item: TableDataItem, itemIndex: number) => {
                    const id = item.id;
                    let buttonInfo: any;
                    let buttonInfoName;
                    let buttonInfoColor;
                    let buttonInfoActive;

                    if (buttonData) {
                      buttonInfo = buttonData?.find(
                        (button: any) => button.id === id,
                      );

                      const buttonName: any = {
                        'LISTO PARA COBRAR': 'Cobrar',
                        'EN ESPERA DE PAGO': 'Espera',
                        PAGADO: 'Pagado',
                      };

                      const buttonColor: any = {
                        'LISTO PARA COBRAR': 'blue',
                        'EN ESPERA DE PAGO': 'green',
                        PAGADO: 'red',
                      };

                      const buttonActive: any = {
                        'LISTO PARA COBRAR': true,
                        'EN ESPERA DE PAGO': false,
                        PAGADO: false,
                      };

                      buttonInfoName = buttonName[buttonInfo.text];
                      buttonInfoColor = buttonColor[buttonInfo.text];
                      buttonInfoActive = buttonActive[buttonInfo.text];
                    }

                    return (
                      <tr key={id} className="h-14">
                        {item.cells.map((cell: string, idx: number) => (
                          <td
                            key={`table-cell-${id}-cell-${itemIndex}-${idx}`}
                            colSpan={1}
                            className="table-cell text-center text-sm md:text-base font-light p-2"
                          >
                            {cell}
                          </td>
                        ))}
                        {buttonData && buttonInfo.isShowed ? (
                          <td
                            key={`table-cell-${id}-button-${itemIndex}`}
                            colSpan={1}
                            className="table-cell text-center text-sm md:text-base font-light p-2"
                          >
                            <div
                              className={`flex items-center justify-center ${buttonInfoActive ? 'pointer-events-all' : 'pointer-events-none'}`}
                            >
                              <Button
                                text={buttonInfoName}
                                size="small"
                                color={buttonInfoColor}
                                isLoading={isLoadingButton}
                                onClick={
                                  buttonInfoActive
                                    ? () => onClickButton?.(id)
                                    : undefined
                                }
                              />
                            </div>
                          </td>
                        ) : (
                          <></>
                        )}
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
        {isScrollable && (
          <div className="absolute top-0 right-0 h-full w-10 pointer-events-none">
            <div className="bg-gradient-to-l from-white dark:from-secondary-color h-full w-full"></div>
          </div>
        )}
      </div>
      <Modal
        data={modalData}
        isOpen={modalData.isOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Table;
