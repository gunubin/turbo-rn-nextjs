import {useRouter} from 'next/router';

export const BackButton = () => {
  const router = useRouter();
  return (
    <a className="navbar-brand" onClick={() => router.back()}>
      戻る
    </a>
  );
};
