import '../styles/globals.scss';
import {NextPage} from 'next';
import type {AppProps} from 'next/app';
import {ReactElement, ReactNode} from 'react';
import {Provider} from 'react-redux';

import {EnvironmentService} from '@app/services/EnvironmentService';
import {ReduxProvider} from '@app/services/redux/ReduxProvider';

import {ConnectedBlockingIndicator} from '@/components/features/modal/BlockingIndicator';
import {ConnectedModal} from '@/components/features/modal/MessageDialog';
import {ConnectedTransientToastList} from '@/components/features/modal/TransientToastList';
import {useAppPage} from '@/pages/_app/hooks';
import {configureStore} from '@/services/redux/store';

EnvironmentService.create({
  API_BASE_URL: process.env.API_BASE_URL,
  NAME: process.env.NAME,
});

const store = configureStore();
const reduxProvider = ReduxProvider.create();
reduxProvider.setContext(store);

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({Component, pageProps}: AppPropsWithLayout) {
  useAppPage();
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <Provider store={store}>
        {getLayout(<Component {...pageProps} />)}
        <ConnectedBlockingIndicator />
        <ConnectedModal />
        <ConnectedTransientToastList />
      </Provider>
    </>
  );
}
