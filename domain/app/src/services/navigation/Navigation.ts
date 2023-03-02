import {useRouter} from 'next/router';

import {INavigation, WebParamList} from '@app/services/navigation/types';

export const useNavigation = (): INavigation<WebParamList> => {
  const router = useRouter();
  return {
    goBack: (): void => {
      router.back();
    },
    navigate: (name, params?) => {
      router.push({pathname: name, query: params});
    },
    pop: () => {
      // TODO:
    },
    popToTop: () => {
      // TODO:
    },
    push: (name, params?) => {
      router.push({pathname: name, query: params});
    },
    replace: (name, params?) => {
      router.replace({pathname: name, query: params});
    },
    reset: (name, params?): void => {
      router.replace({pathname: name, query: params});
    },
  };
};
