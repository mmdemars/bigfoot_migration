# bigfoot_migration

## Purpose
The goal of this analysis is to attempt to predict future locations of bigfoot sightings, and map out the closest locations to get the best tacos nearby those sights.  Bigfoot, or sasquatch, has had reported sightings all across the US, and assuming the veracity of those claims I want ot explore whether migration patterms of bigfoot are predictable - and where the best nearby tacos are for bigfoot expedition provisions.

## Tools
Primarily Python, with machine learning models. Something to map past predicitons, and future sites. Loctions of nearby tacos restaurants with 5 star ratings. Javascript, flask and SOMETHING to display the data, and a Tableau Public presentation of findings. Possibly SQL if I can find a reason for it.

## Questions
- Can bigfoot migrations be predicted from past bigfoot sightings?
- Where are the best tacos restaurants nearby past and future bigfoot sighting sites?

## Results
The Decision Tree Classifier was able to predict with 50% accuracy based on latitude and longitude, with the Classificaition type as the defining feature.

<img src="https://github.com/mmdemars/bigfoot_migration/blob/main/images/decisiontree_classifier.png" width="400">

The Random Forest Classifier was able to predict with 53% accuracy given the same inputs.
<img src="https://github.com/mmdemars/bigfoot_migration/blob/main/images/randomforest_classifier.png" width="400">

As Class A reports are considered to be much more reliable and irrefutable than Class B and C reorts - a question arises as to whether limiting the data set to just the Class A reports would improve maching learning performance.
**Answered - it drops preformance to 11%.**
