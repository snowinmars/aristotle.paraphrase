import {ReportHandler} from 'web-vitals';

const reportWebVitals = (onPerfEntry?: ReportHandler): Promise<undefined> => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    return import('web-vitals').then(({getCLS, getFID, getFCP, getLCP, getTTFB}): undefined => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);

      return undefined;
    });
  }

  return Promise.resolve(undefined);
};

export default reportWebVitals;
