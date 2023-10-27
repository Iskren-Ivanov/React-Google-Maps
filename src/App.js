import NavigationBar from './components/NavigationBar/NavigationBar';
import Router from './components/Router/CustomRouter';
import styles from './App.module.css';

const App = () => {
  return (
    <div className={ styles.appContainer }>
      <NavigationBar />
      <div className={ styles.appContent }>
        <Router />
      </div>
    </div >
  );
};

export default App;
