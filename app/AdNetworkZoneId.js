import {ZONE_IDS} from './Constants'

const AdNetworkZoneId = class {
    static interstitialZoneNetwork = 'tapsell'
    static nativeZoneNetwork = 'tapsell'
    static standardZoneNetwork = 'tapsell'
    static rewardeZoneNetwork = 'tapsell'


    static getInterstitial() {
        let zoneId = ZONE_IDS[this.interstitialZoneNetwork].INTERSTITIAL
        if(!zoneId) return false
        return zoneId
    }

    static getNative() {
        let zoneId = ZONE_IDS[this.nativeZoneNetwork].NATIVE
        if(!zoneId) return false
        return zoneId
    }

    static getStandard() {
        let network = ZONE_IDS[this.standardZoneNetwork]
        if(!network) return false
        let zoneId = ZONE_IDS[this.standardZoneNetwork].STANDARD
        if(!zoneId) return false
        return zoneId
    }

    static getRewarded() {
        let zoneId = ZONE_IDS[this.rewardeZoneNetwork].REWARDED
        if(!zoneId) return false
        return zoneId
    }
}

export default AdNetworkZoneId
export { AdNetworkZoneId }