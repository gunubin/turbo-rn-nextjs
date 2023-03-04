import {createApi} from '@reduxjs/toolkit/query/react';

import {appBaseQuery} from '@domain/app/lib/redux/appBaseQuery';
import {EnvironmentService} from '@domain/app/services/EnvironmentService';

export const appApi = createApi({
  baseQuery: appBaseQuery(() =>
    EnvironmentService.create().get('API_BASE_URL')
  ),
  endpoints: () => ({}),
  reducerPath: 'appApi',
  tagTypes: ['Todo'],
});
