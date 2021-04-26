import React from 'react';
import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/use-photos';

export default function Timeline() {
  const { photos } = usePhotos();

  return (
    <div className="container col-span-2">
      {
        // eslint-disable-next-line no-nested-ternary
        !photos ? (
          <>
            <Skeleton count={4} width={640} height={500} className="mb-5" />
          </>
        ) : photos?.length > 0 ? (
          photos.map((photo) => <p key={photo.docId}>{photo.imageSrc}</p>)
        ) : (
          <p className="text-center text-2xl">Follow People to see photos.</p>
        )
      }
    </div>
  );
}
