import React, {Component} from 'react';
import {Link} from 'routes';
import {Container, Row, Col} from 'components/Base/Grid';
import { inject, observer } from 'mobx-react';
import * as S from './$$';
import AdPath from 'components/Modules/AdPath';
import AdsList from 'components/Modules/AdsList';
import UserCard from 'components/Modules/UserCard';
import styles from './index.sass';

@inject('auth')
@inject('user')
@inject('locales')
@observer
class User extends Component {
  render() {
    const { auth, locales: { t } } = this.props;
    const user = this.props.user.current;

    if (!user) return <div></div>
    
    return (
      <Container>
        <AdPath>
          <Link route="/main"><a>{t('header.homepage')}</a></Link>
          <span>{">"}</span>
          <Link route={user.url}><a>{user.username}</a></Link>
        </AdPath>
        <Row>
          <Col size={8}>
            {user.advertsFetched &&
              <AdsList
                list={user.adverts}
                auth={auth}
                user={user}
                columnsCount={4}
                adKind={'low'}
                showCategory
                isAds
              />
            }
          </Col>
          <Col size={4}>
            <UserCard user={user} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default User;
