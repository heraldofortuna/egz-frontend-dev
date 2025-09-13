export type ComponentColor =
  | 'primary'
  | 'secondary'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'orange'
  | 'red'
  | 'gray';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariant = 'solid' | 'bordered';

export type InputType =
  | 'text'
  | 'name'
  | 'email'
  | 'password'
  | 'phone'
  | 'date'
  | 'document'
  | 'coupon'
  | 'yapeCode';
export type InputVariant = 'normal' | 'light';

export type DropdownElementData = {
  id: number;
  name: string;
};

export type DropdownData = DropdownElementData[];

export type DropdownVariant = 'normal' | 'light';

export type ModalData = {
  type?: ModalType;
  title: string;
  message: string;
  button?: {
    continue?: {
      text?: string;
      type?: 'logout' | 'redirect' | 'reload' | 'other';
      action?: any;
      url?: string;
    };
    secondary?: {
      text: string;
      action: any;
    };
  };
  isOpen: boolean;
};

export type ModalType = 'default' | 'error' | 'success';

export type MenuItem = {
  id: string;
  url: string;
  name: string;
  isUserAuth: boolean;
};

export type MenuItems = MenuItem[];

export type TabsData = TabData[];

export type TabData = {
  id: string;
  label: string;
  isShowed: boolean;
  content: any;
};

export type TableData = TableDataItem[];

export type TableDataItem = {
  id: string;
  cells: string[];
};

export type PlayResult = {
  id: number;
  type: string;
  localScore: number;
  visitScore: number;
};

export type GameResult = PlayResult[];

export type PhaseResult = GameResult[];
