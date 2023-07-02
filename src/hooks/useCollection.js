import { useState, useEffect } from 'react';
import { db } from '../components/firebase/config';

// firebase imports
import { collection, onSnapshot } from 'firebase/firestore';

const useCollection = (col) => {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        let colRef = collection(db, col)

        // here we set up a realtime event listener the onSnapshot function and the first thing we pass in is the (colRef) so we're basically saying connect to this collection (colRef) and we want realtime data from that collection and the second argument is a function that fires once when we first connect to it and also everytime the data changes in that collection and we get access to the snapshot abject so everytime the function fires we have a snapshot of the collection at that moment in time .. etc
        
        // when we setup a realtime listener we get back from that an "unsubscribe" function incase we want to unsubscribe from realtime data and we need to do that when a component unmounts
        const unsub = onSnapshot(colRef, (snapshot) => {
            let documents = []
              snapshot.docs.forEach(doc => documents.push({ id: doc.id, ...doc.data() }))
              setTasks(documents);
        })
        // now what we need to do is create a clean up function inside useEffect which is going to call the unsub function so that we unsubscribe from realtime data when the component unmounts
        return () => unsub()
        // we pass in the collection as a dependency so that if the collection changes then it re-runs the function
    }, [col])

    return { tasks }
}

export { useCollection }