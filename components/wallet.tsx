import { useWallet } from '@cosmos-kit/react';
import {
  GridItem,
  Icon,
} from '@chakra-ui/react';
import { MouseEventHandler, useEffect } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import {
  Error,
  Connected,
  ConnectedShowAddress,
  Connecting,
  ConnectStatusWarn,
  CopyAddressBtn,
  Disconnected,
  NotExist,
  Rejected,
  RejectedWarn,
  WalletConnectComponent,
} from './react';
import { getChainName } from '../config';

export const WalletSection = () => {
  const walletManager = useWallet();
  const {
    connect,
    openView,
    walletStatus,
    address,
    message,
    currentChainName,
    currentWallet,
    setCurrentChain,
    isWalletConnected
  } = walletManager;

  useEffect(() => {
    if (!isWalletConnected) {
      setCurrentChain(getChainName());
    }
  }, [setCurrentChain, isWalletConnected]);

  // Events
  const onClickConnect: MouseEventHandler = async (e) => {
    e.preventDefault();
    await connect();
  };

  const onClickOpenView: MouseEventHandler = (e) => {
    e.preventDefault();
    openView();
  };

  // Components
  const connectWalletButton = (
    <WalletConnectComponent
      walletStatus={walletStatus}
      disconnect={
        <Disconnected buttonText="Connect Wallet" onClick={onClickConnect} />
      }
      connecting={<Connecting />}
      connected={
        <Connected buttonText={''} onClick={onClickOpenView} />
      }
      rejected={<Rejected buttonText="Reconnect" onClick={onClickConnect} />}
      error={<Error buttonText="Change Wallet" onClick={onClickOpenView} />}
      notExist={
        <NotExist buttonText="Install Wallet" onClick={onClickOpenView} />
      }
    />
  );

  const connectWalletWarn = (
    <ConnectStatusWarn
      walletStatus={walletStatus}
      rejected={
        <RejectedWarn
          icon={<Icon as={FiAlertTriangle} mt={1} />}
          wordOfWarning={`${currentWallet?.walletInfo.prettyName}: ${message}`}
        />
      }
      error={
        <RejectedWarn
          icon={<Icon as={FiAlertTriangle} mt={1} />}
          wordOfWarning={`${currentWallet?.walletInfo.prettyName}: ${message}`}
        />
      }
    />
  );

  const addressBtn = currentChainName && (
    <CopyAddressBtn
      walletStatus={walletStatus}
      connected={<ConnectedShowAddress address={address} isLoading={false} />}
    />
  );

  return (
      <>
          {addressBtn}
          {connectWalletButton}
          {connectWalletWarn && <GridItem>{connectWalletWarn}</GridItem>}
      </>
  );
};
