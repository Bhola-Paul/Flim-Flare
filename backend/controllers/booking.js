import Booking from "../models/booking.js";
import Show from "../models/show.js"



//function to check availablity of seat
export const checkSeatAvailability = async (showId, selectedSeats) => {
    try {
        const showData = await Show.findById(showId);
        // console.log(showData)
        
        if (!showData) {
            return false;
        }
        const occupiedSeats = showData.occupiedSeats;
        const isAnySeatTaken = selectedSeats.some(seat => occupiedSeats[seat]);
        if (isAnySeatTaken) return false;
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

//create booking

export const createBooking = async (req, res) => {
    try {
        const { userId, showId, selectedSeats } = req.body;
        const { origin } = req.headers;
        // console.log(showId);
        
        const isAvailable = await checkSeatAvailability(showId, selectedSeats);
        if (!isAvailable) {
            return res.json({
                success: false,
                message: 'Selected Seats are already booked'
            })
        }
        const showData = await Show.findById(showId).populate('movie');

        const booking = await Booking.create({
            user: userId,
            show: showId,
            amount: showData.showPrice * selectedSeats.length,
            bookedSeats: selectedSeats,
        });
        selectedSeats.map((seat) => {
            showData.occupiedSeats[seat] = userId;
        })
        showData.markModified('occupiedSeats');
        await showData.save();
        //stripe payment
        return res.json({
            success: true,
            message: 'Booked Successfully'
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const getOccupiedSeats=async (req,res) => {
    try {
        const {showId}=req.params;
        const showData=await Show.findById(showId);
        const occupiedSeats=Object.keys(showData.occupiedSeats);
        return res.json({
            success: true,
            occupiedSeats
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}