import React, { Component } from 'react';
import cx from 'classnames';
import styles from './index.sass';
import { debounce } from 'lodash';
import { months } from 'utils/mock';

class Roadmap extends Component {
  startDelay = 700;
  animationTime = 4;
  date = new Date();
  monthNum = this.date.getMonth();

  _roadmap = React.createRef ? React.createRef() : null;

  state = {
    active: false,
    showDefaultGradient: false,
    offset: 0,
    activeMonths: [],
    showCurrentMonth: false
  }

  componentDidMount = () => {
    this.onScroll();
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll = debounce(() => {
    if (!this.state.active) {
      const roadmapNode = (this._roadmap && this._roadmap.current) || null;
      if (!roadmapNode) return;

      if (this.isInViewport(roadMap)) {
        this.setState({ active: true });
        window.removeEventListener('scroll', this.onScroll);

        setTimeout(() => {
          const gradient1 = document.getElementById('gradient1Anim');
          const gradient2 = document.getElementById('gradient2Anim');

          if ('beginElement' in gradient1) {
            gradient1.beginElement();
          }
          if ('beginElement' in gradient2) {
            gradient2.beginElement();
          }
        }, this.startDelay - 350);

        setTimeout(() => {
          this.setState({ showDefaultGradient: true });
        }, this.startDelay + 50);

        for (let i = 0; i <= months.length; i++) {
          let monthDelay = (0.23 + i * 0.037) * 1000 * this.animationTime;

          setTimeout(() => {
            let activeMonths = this.state.activeMonths;

            if (i === this.monthNum) {
              this.setState({ showCurrentMonth: true });
            }

            activeMonths.push(i);

            this.setState({ activeMonths: activeMonths });
          }, monthDelay );
        }
      }
    }
  }, 50)

  isInViewport = (element) => {
    var rect = element.getBoundingClientRect();
    var html = document.documentElement;

    return (
      rect.top >= 0 &&
      (
        (rect.bottom - 700) <= (window.innerHeight || html.clientHeight) ||
        rect.top < 700
      )
    );
  }

  render () {
    const { t } = this.props
    return (
      <div
        id={'roadMap'}
        ref={this._roadmap}
        className={cx(
          styles.root,
          this.props.className,
          {[styles.root_active]: this.state.active}
        )}
      >
        <div className={styles.inner}>
          {months.map((month, i) => (
            <div
              key={i}
              className={cx(
                styles.month,
                {[styles.month_active]: this.state.activeMonths.includes(i)},
                {[styles.month_current]: this.state.activeMonths.includes(i) && i === this.monthNum},
                i % 2 ? styles.month_even : styles.month_odd
              )}
              style={month.cardStyle}
            >
              <div className={styles.info}>
                <div className={styles.title}>{t(`landing.roadmap_${i}.title`)}</div>
                <div className={styles.description}>
                  <ul className={styles.ul}>
                    {month.description.map((paragraph, k) => (
                      <li key={k} className={styles.li} dangerouslySetInnerHTML={{ __html: t(`landing.roadmap_${i}.text_${k}`) }} />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.wave}>
          <svg
            id={'roadMapSvg'}
            width={'1976px'}
            height={'340px'}
            viewBox={'0 0 1976 305'}
            version={'1.1'}
            xmlns={'http://www.w3.org/2000/svg'}
          >
            <defs>
              {months.map((month, i) => (
                <g key={i}>
                  <linearGradient
                    className={cx(
                      styles.lineGradient,
                      {[styles.lineGradient_active]: i <= this.monthNum}
                    )}
                    id={`lineGradient${i}`}
                    x2="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(11.1367) scale(2.53239 50.6478) rotate(90)"
                  >
                    <stop className={styles.lineGradient__0} />
                    <stop className={styles.lineGradient__1} offset={'1'} />
                  </linearGradient>
                  <radialGradient
                    className={cx(
                      {[styles.radialGradient_active]: this.state.activeMonths.includes(i) && i < this.monthNum},
                      {[styles.radialGradient_current]: i === this.monthNum && this.state.showCurrentMonth}
                    )}
                    key={i}
                    id={`radialGradient${i}`}
                    cx="0.5"
                    cy="0.5"
                    r="0.5"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(-18.0742 -18.0742) scale(53.1484)"
                  >
                    <stop
                      className={cx(
                        styles.circleStop,
                        styles.circleStop0
                      )}
                    />
                    <stop
                      className={cx(
                        styles.circleStop,
                        styles.circleStop1
                      )}
                      offset="1"
                    />
                  </radialGradient>
                </g>
              ))}
              <linearGradient
                id={'roadmapGradient'}
                x1={'0%'}
                y1={'0%'}
                x2={'100%'}
                y2={'0%'}
              >
                <stop stopColor={'#823FFF'}>
                  <animate
                    id={'gradient1Anim'}
                    begin={'click'}
                    attributeName={'offset'}
                    values={'0;' + (0.23 + this.monthNum * 0.05)}
                    dur={((0.21 + this.monthNum * 0.037) * this.animationTime) + 's'}
                    fill={'freeze'}
                  />
                </stop>
                <stop stopColor={'#D8D8D8'}>
                  <animate
                    id={'gradient2Anim'}
                    begin={'click'}
                    attributeName={'offset'}
                    values={'0.05;' + (0.23 + this.monthNum * 0.05 + 0.05)}
                    dur={((0.21 + this.monthNum * 0.037) * this.animationTime) + 's'}
                    fill={'freeze'}
                  />
                </stop>
              </linearGradient>
            </defs>
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g transform="translate(-278.000000, -6020.000000)">
                <g transform="translate(281.000000, 6023.000000)">
                  <style dangerouslySetInnerHTML={{__html: `
                    .gradientRoadPath, .roadPath {
                      stroke-dasharray: 200%;
                      stroke-dashoffset: 200%;
                    }
                    .gradientRoadPath {
                      transition: all ${this.animationTime}s 0.25s linear;
                    }
                    .roadPath {
                      transition: all ${this.animationTime}s linear;
                    }
                    .${styles.root_active} .gradientRoadPath, .${styles.root_active} .roadPath {
                      stroke-dashoffset: 0%;
                    }
                  `}} />
                  <path
                    className={styles.roadPath}
                    d="M0,260.381964 C114.171679,137.575565 253.834518,74.0178674 418.988518,69.7088709 C666.719519,63.2453762 826.129032,272.601891 1138.48551,267.922708 C1450.84199,263.243525 1655.48934,-16.4710583 1970,0.764927578"
                    stroke={'#D8D8D8'}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    className={'gradientRoadPath'}
                    id={'roadPath'}
                    d="M0,260.381964 C114.171679,137.575565 253.834518,74.0178674 418.988518,69.7088709 C666.719519,63.2453762 826.129032,272.601891 1138.48551,267.922708 C1450.84199,263.243525 1655.48934,-16.4710583 1970,0.764927578"
                    stroke={`url(#roadmapGradient)`}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {months.map((month, i) => (
                    <g key={i}>
                      <animateMotion
                        begin={'0s'}
                        keyTimes={'0;1'}
                        keyPoints={(0.23 + i * 0.05) + ';' + (0.23 + i * 0.05)}
                        calcMode={'linear'}
                      >
                        <mpath xlinkHref={'#roadPath'} />
                      </animateMotion>
                      <path
                        className={cx(
                          styles.line,
                          {[styles.line_active]: this.state.activeMonths.includes(i)}
                        )}
                        d={'M0 0V40'}
                        cx={'0'}
                        cy={'0'}
                        transform={i % 2 ? 'rotate(180) translate(0 8)' : 'translate(0 8)'}
                        stroke={`url(#lineGradient${i})`}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="2 5"
                      />
                      {i === this.monthNum &&
                        <circle
                          className={cx(
                            styles.shadow,
                            {[styles.shadow_current]: this.state.activeMonths.includes(i) && i === this.monthNum}
                          )}
                          fill={`url(#radialGradient${i})`}
                          cx={'0'}
                          cy={'0'}
                          r={'8.5'}
                        />
                      }
                      <circle
                        className={cx(
                          styles.circle,
                          {[styles.circle_active]: this.state.activeMonths.includes(i) && i != this.monthNum},
                          {[styles.circle_current]: this.state.activeMonths.includes(i) && i === this.monthNum}
                        )}
                        fill={`url(#radialGradient${i})`}
                        cx={'0'}
                        cy={'0'}
                        r={'8.5'}
                      />
                    </g>
                  ))}
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
    );
  }
};

Roadmap.displayName = 'Modules/Roadmap';

export default Roadmap;
