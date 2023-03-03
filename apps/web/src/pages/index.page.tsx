import Head from 'next/head';

import {ConnectedTodoInputForm} from '@/components/features/todo/TodoInputForm';
import {ConnectedTodoList} from '@/components/features/todo/TodoList';
import {HomeLayout} from '@/components/layouts/HomeLayout';

export default function Home() {
  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Todo App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeLayout>
        <div className="container">
          <div className="mt-5">
            <ConnectedTodoInputForm />
            <div className="mt-5">
              <ConnectedTodoList />
            </div>
          </div>
        </div>
      </HomeLayout>
    </>
  );
}
