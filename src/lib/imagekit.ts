import { buildSrc } from '@imagekit/next';

export const imagekitConfig = {
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
};

export const buildImagekitUrl = (options: {
  src: string;
  transformation?: Array<Record<string, any>>;
  queryParameters?: Record<string, string>;
}) => {
  return buildSrc({
    urlEndpoint: imagekitConfig.urlEndpoint,
    src: options.src,
    transformation: options.transformation,
    queryParameters: options.queryParameters,
  });
};

export default imagekitConfig;