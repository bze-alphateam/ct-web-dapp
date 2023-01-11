import { MouseEventHandler, ReactNode } from 'react';
import { IconType } from 'react-icons';

export interface ChooseChainInfo {
  chainName: string;
  chainRoute?: string;
  label: string;
  value: string;
  icon?: string;
  disabled?: boolean;
}

export enum WalletStatus {
  NotInit = 'NotInit',
  Loading = 'Loading',
  Loaded = 'Loaded',
  NotExist = 'NotExist',
  Rejected = 'Rejected'
}

export interface ConnectWalletType {
  buttonText?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  icon?: IconType;
  onClickConnectBtn?: MouseEventHandler<HTMLButtonElement>;
}

export interface ConnectedUserCardType {
  walletIcon?: string;
  username?: string;
  icon?: ReactNode;
}

export interface PublisherProps {
  name: string,
  address: string,
  active: boolean,
  articles_count: number,
  created_at: string,
  respect: string,
}

export interface ArticleProps {
  id: string;
  title: string;
  url: string;
  picture: string;
  publisher: string;
  paid: boolean;
  created_at: string
}

export interface FeatureProps {
  id: string;
  title: string;
  url: string;
  picture: string;
  publisher: string;
  paid: boolean;
  created_at: string
}

export interface ChainCardProps {
  prettyName: string;
  icon?: string;
}

export type CopyAddressType = {
  address?: string;
  walletIcon?: string;
  isLoading?: boolean;
  maxDisplayLength?: number;
  isRound?: boolean;
  size?: string;
};

export type PageTitleProps = {
  title: string,
  subTitle: string,
  subTitleHighlighted: string,
}

export type Info = {
  url: string,
  title: string,
}

export type InfoList = {
  info: Info[]
}