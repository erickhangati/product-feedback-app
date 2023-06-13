import React, { useEffect, useState } from 'react';
import RoadmapTile from './RoadmapTile';
import styles from './RoadmapList.module.scss';
import { ProductRequest } from '../../data/data-types/types';

interface Props {
  productRequests: ProductRequest[];
}

interface ActiveRequests {
  requests: ProductRequest[];
  heading: string;
  columnDesc: string;
  status: string;
}

const RoadmapList: React.FC<Props> = ({ productRequests }) => {
  const [activeState, setActiveState] = useState<ActiveRequests | null>(null);

  useEffect(() => {
    setActiveState({
      requests: planned,
      heading: 'Planned',
      columnDesc: 'Ideas prioritized for research',
      status: 'planned',
    });
  }, []);

  const filterStatus = (status: string) => {
    const filtered = productRequests.filter(
      (request) => request.status === status
    );
    return filtered;
  };

  const planned = filterStatus('planned');
  const inProgress = filterStatus('in-progress');
  const live = filterStatus('live');

  const roadmapColumn = (
    requests: ProductRequest[],
    heading: string,
    columnDesc: string,
    status: string
  ) => {
    return (
      <div className={styles['roadmap-column']}>
        <div className={styles['roadmap-column__header']}>
          <h3>{`${heading} (${requests.length})`}</h3>
          <p>{columnDesc}</p>
        </div>
        <ul className={styles['roadmap-column__tiles']}>
          {requests.map((item) => (
            <RoadmapTile
              key={item._id}
              className={styles[`roadmap__tile--${status}`]}
              productRequest={item}
            />
          ))}
        </ul>
      </div>
    );
  };

  const navClickHandler = (status: string) => {
    if (status === 'planned') {
      setActiveState({
        requests: planned,
        heading: 'Planned',
        columnDesc: 'Ideas prioritized for research',
        status: 'planned',
      });
    }

    if (status === 'in-progress') {
      setActiveState({
        requests: inProgress,
        heading: 'In Progress',
        columnDesc: 'Currently being developed',
        status: 'in-progress',
      });
    }

    if (status === 'live') {
      setActiveState({
        requests: live,
        heading: 'Live',
        columnDesc: 'Released features',
        status: 'live',
      });
    }
  };

  return (
    <>
      <div className={styles['roadmap-list']}>
        {/* PLANNED */}
        {roadmapColumn(
          planned,
          'Planned',
          'Ideas prioritized for research',
          'planned'
        )}

        {/* IN-PROGRESS */}
        {roadmapColumn(
          inProgress,
          'In Progress',
          'Currently being developed',
          'in-progress'
        )}

        {/* LIVE */}
        {roadmapColumn(live, 'Live', 'Released features', 'live')}
      </div>

      {/* MOBILE */}
      <div className={styles['roadmap-mobile']}>
        <nav className={styles['mobile-nav']}>
          <ul>
            <li
              className={
                activeState?.status === 'planned' ? styles['nav--planned'] : ''
              }
              onClick={navClickHandler.bind(null, 'planned')}
            >{`Planned (${planned.length})`}</li>
            <li
              className={
                activeState?.status === 'in-progress'
                  ? styles['nav--in-progress']
                  : ''
              }
              onClick={navClickHandler.bind(null, 'in-progress')}
            >{`In Progress (${inProgress.length})`}</li>
            <li
              className={
                activeState?.status === 'live' ? styles['nav--live'] : ''
              }
              onClick={navClickHandler.bind(null, 'live')}
            >{`Live (${live.length})`}</li>
          </ul>
        </nav>

        {activeState &&
          roadmapColumn(
            activeState?.requests,
            activeState?.heading,
            activeState?.columnDesc,
            activeState?.status
          )}
      </div>
    </>
  );
};

export default RoadmapList;
