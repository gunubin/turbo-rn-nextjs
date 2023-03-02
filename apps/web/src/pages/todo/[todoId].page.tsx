import Head from 'next/head';

import {ConnectedTodoEditForm} from '@/components/features/todo/TodoEditForm';
import {TodoDetailLayout} from '@/components/layouts/TodoDetailLayout';

import {useTodoDetailPage} from './hooks';

export default function TodoDetailPage() {
  const {item} = useTodoDetailPage();
  return (
    <>
      <Head>
        <title>{item?.title}</title>
        <meta name="description" content="Todo App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TodoDetailLayout>
        <div className="container mt-5">
          <ConnectedTodoEditForm />
        </div>
      </TodoDetailLayout>
    </>
  );
}
