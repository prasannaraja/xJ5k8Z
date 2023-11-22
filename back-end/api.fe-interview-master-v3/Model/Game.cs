namespace api.fe_interview_master_v3.Model
{
    public class Game
    {
        public string id { get; set; }
        public string slug { get; set; }
        public string title { get; set; }
        public string tag { get; set; }
        public string providerName { get; set; }
        public string startUrl { get; set; }
        public Thumb thumb { get; set; }
    }

    public class Thumb
    {
        public string url { get; set; }
        public string title { get; set; }
    }
}
